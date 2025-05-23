import { NextResponse } from 'next/server';
import { Client, Databases, Query } from 'node-appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68300862001cb755dc72')
  .setKey('standard_5e96661625bce7f03a71a9a059090c5cd7077662bb56e27c70b18ff7df8d013b8b07b38b8ab667ef76f9a2c44e725c25247f6f5cc29ad33439f86570afcd6c521c7814f0c65f6a7e639b39ce2c5e18958547b3b6d9a2c9d8ead6860907f0c82ef34794fa31c9babf1dec7966010a3d3236e8ba94eb4556614450d41faffdeb1c');

const databases = new Databases(client);
const DATABASE_ID = "683017920018c45c6980";
const COLLECTION_ID = "6830186b001b687fb654";

export async function POST(req) {
  try {
    const { cutoff, category, course, college } = await req.json();

    if (!cutoff || !category) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const allDocs = [];
    let lastId = null;
    const limit = 100;

    while (true) {
      const queries = [
        Query.greaterThanEqual(category.toUpperCase(), parseFloat(cutoff)),
        Query.limit(limit),
      ];
      if (course && Array.isArray(course) && course.length > 0) {
        queries.push(Query.contains('brn', course));
      }
      if (college && Array.isArray(college) && college.length > 0) {
        queries.push(Query.equal('con', college));
      }
      if (lastId) {
        queries.push(Query.cursorAfter(lastId));
      }

      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);

      allDocs.push(...res.documents);
      if (res.documents.length < limit) break;
      lastId = res.documents[res.documents.length - 1].$id;
    }

    return NextResponse.json(allDocs);
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
