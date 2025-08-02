import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import Tutorial from '@/models/Tutorial';
import cloudinary from '@/lib/cloudinary'; // Make sure this is configured properly
import User from '@/models/User'; // ✅ required to register the User schema


// export async function POST(req) {
//   await connectDB();

//   const cookieStore = await cookies(); // ✅ await added here
//   const token = cookieStore.get('token')?.value;

//   if (!token) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   let userData;
//   try {
//     userData = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//   }

//   const formData = await req.formData();

//   const title = formData.get('title');
//   const videoUrl = formData.get('videoUrl');
//   const category = formData.get('category');
//   const content = formData.get('content');
//   const authorName = formData.get('authorName');
//   const file = formData.get('image');

//   let imageUrl = '/placeholder.png';

//   // ✅ Cloudinary upload
//   if (file && file.name) {
//     const buffer = Buffer.from(await file.arrayBuffer());

//     try {
//       const uploaded = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ folder: 'tutorial_images' }, (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           })
//           .end(buffer);
//       });

//       imageUrl = uploaded.secure_url;
//     } catch (uploadErr) {
//       console.error('Cloudinary Upload Error:', uploadErr);
//       return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
//     }
//   }

//   const tutorial = new Tutorial({
//     title,
//     videoUrl,
//     category,
//     content,
//     imageUrl,
//     author: userData.id,
//     authorName: authorName || 'Anonymous',
//   });

//   try {
//     await tutorial.save();
//     return NextResponse.json({ message: 'Tutorial created successfully!' }, { status: 201 });
//   } catch (err) {
//     console.error('DB Save Error:', err);
//     return NextResponse.json({ error: 'Failed to save tutorial' }, { status: 500 });
//   }
// }


export async function POST(req) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let userData;
  try {
    userData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const formData = await req.formData();

  const title = formData.get('title');
  const category = formData.get('category');
  const content = formData.get('content');
  const authorName = formData.get('authorName');
  const imageFile = formData.get('image');
  const videoFile = formData.get('video'); // 👈 added for video upload

  let imageUrl = '/placeholder.png';
  let videoUrl = '';

  // ✅ Upload image to Cloudinary
  if (imageFile && imageFile.name) {
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    try {
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'tutorial_images' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(imageBuffer);
      });

      imageUrl = uploadedImage.secure_url;
    } catch (uploadErr) {
      console.error('Cloudinary Image Upload Error:', uploadErr);
      return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
  }

  // ✅ Upload video to Cloudinary
  if (videoFile && videoFile.name) {
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

    try {
      const uploadedVideo = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'tutorial_videos', resource_type: 'video' }, // 👈 resource_type is important
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          )
          .end(videoBuffer);
      });

      videoUrl = uploadedVideo.secure_url;
    } catch (videoErr) {
      console.error('Cloudinary Video Upload Error:', videoErr);
      return NextResponse.json({ error: 'Video upload failed' }, { status: 500 });
    }
  }

  const tutorial = new Tutorial({
    title,
    videoUrl,
    category,
    content,
    imageUrl,
    author: userData.id,
    authorName: authorName || 'Anonymous',
  });

  try {
    await tutorial.save();
    return NextResponse.json({ message: 'Tutorial created successfully!' }, { status: 201 });
  } catch (err) {
    console.error('DB Save Error:', err);
    return NextResponse.json({ error: 'Failed to save tutorial' }, { status: 500 });
  }
}


// ==================== GET ====================
export async function GET() {
  await connectDB();

  try {
    const tutorials = await Tutorial.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    const safeTutorials = tutorials.map((tutorial) => ({
      ...tutorial,
      _id: tutorial._id.toString(),
      createdAt: tutorial.createdAt?.toString(),
      updatedAt: tutorial.updatedAt?.toString(),
      author: tutorial.author?._id
        ? {
            ...tutorial.author,
            _id: tutorial.author._id.toString(),
          }
        : tutorial.author,
    }));

    return NextResponse.json(safeTutorials);
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch tutorials' }, { status: 500 });
  }
}
