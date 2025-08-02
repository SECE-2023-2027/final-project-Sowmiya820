// import { connectDB } from '@/lib/mongodb';
// import Tutorial from '@/models/Tutorial';
// import { NextResponse } from 'next/server';

// // GET single tutorial with author and comments
// export async function GET(req, { params }) {
//    // ✅ ADD THIS
//   await connectDB();
// console.log("Received ID:", params.id);
//   const tutorialDoc = await Tutorial.findById(params.id)
//     .populate('comments.user', 'name');

//   if (!tutorialDoc) {
//     return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
//   }

//   return NextResponse.json(tutorialDoc);
// }


// // PUT to update tutorial
// export async function PUT(req, context) {
//   await connectDB();

//   const { id } = context.params;

//   try {
//     const data = await req.json();
//     const updated = await Tutorial.findByIdAndUpdate(id, data, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updated) {
//       return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
//     }

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error('PUT error:', error);
//     return NextResponse.json({ error: 'Error updating tutorial' }, { status: 500 });
//   }
// }

// // DELETE a tutorial

// export async function DELETE(_req, context) {
//   await connectDB();
//   const { id } = context.params;

//   try {
//     const deleted = await Tutorial.findByIdAndDelete(id);
//     if (!deleted) {
//       return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Tutorial deleted' });
//   } catch (error) {
//     console.error('DELETE error:', error);
//     return NextResponse.json({ error: 'Error deleting tutorial' }, { status: 500 });
//   }
// }

// // export async function DELETE(_req, context) {
// //   await connectDB();

// //   const { id } = context.params;

// //   try {
// //     const deleted = await Tutorial.findByIdAndDelete(id);
// //     if (!deleted) {
// //       return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
// //     }

// //     return NextResponse.json({ message: 'Tutorial deleted' });
// //   } catch (error) {
// //     console.error('DELETE error:', error);
// //     return NextResponse.json({ error: 'Error deleting tutorial' }, { status: 500 });
// //   }
// // }









import { connectDB } from "@/lib/mongodb";
import Tutorial from "@/models/Tutorial";
import { NextResponse } from "next/server";
import User from '@/models/User'; // ✅ required to register the User schema
import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    const tutorial = await Tutorial.findById(params.id)
      .populate('author', 'email') // populate tutorial author's email
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'email' // populate comment author's email
        }
      });

    if (!tutorial) {
      return new Response(JSON.stringify({ message: 'Tutorial not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(tutorial), { status: 200 });
  } catch (error) {
    console.error('Error fetching tutorial details:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
export async function PUT(req, { params }) {
  await connectDB();
  const formData = await req.formData();

  const title = formData.get('title');
  const videoFile = formData.get('video'); // <-- get video
  const category = formData.get('category');
  const content = formData.get('content');
  const authorName = formData.get('authorName');
  const image = formData.get('image');

  let imageUrl = null;
  let videoUrl = null;

  try {
    // Upload image if present
    if (image && typeof image === 'object') {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tmpDir = os.tmpdir();
      const tmpFilePath = path.join(tmpDir, image.name);
      await writeFile(tmpFilePath, buffer);

      const uploadResult = await cloudinary.uploader.upload(tmpFilePath, {
        folder: 'tutorials/images',
      });

      imageUrl = uploadResult.secure_url;
    }

    // Upload video if present
    if (videoFile && typeof videoFile === 'object') {
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tmpDir = os.tmpdir();
      const tmpFilePath = path.join(tmpDir, videoFile.name);
      await writeFile(tmpFilePath, buffer);

      const uploadResult = await cloudinary.uploader.upload(tmpFilePath, {
        resource_type: 'video', // VERY IMPORTANT
        folder: 'tutorials/videos',
      });

      videoUrl = uploadResult.secure_url;
    }

    const updateData = {
      title,
      category,
      content,
      authorName,
    };

    if (imageUrl) updateData.imageUrl = imageUrl;
    if (videoUrl) updateData.videoUrl = videoUrl;

    const updatedTutorial = await Tutorial.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTutorial) {
      return NextResponse.json({ error: 'Tutorial not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTutorial);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function DELETE(_req, { params }) {
  await connectDB();

  try {
    const deleted = await Tutorial.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tutorial deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
