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
    const { cutoff, category, course, college, keyword } = await req.json();

    // At least one search criteria should be provided
    if (!cutoff && !course?.length && !college?.length && !keyword) {
      return NextResponse.json({ error: 'Please provide at least one search criteria' }, { status: 400 });
    }

    let queries = [Query.limit(100)];

    // Add cutoff filter if provided
    if (cutoff && category) {
      queries.push(Query.greaterThanEqual(category.toUpperCase(), parseFloat(cutoff)));
    }

    // Add keyword search if provided
    if (keyword && keyword.trim()) {
      queries.push(Query.contains('con', keyword.trim()));
    }

    // Add course filter if provided
    if (course && Array.isArray(course) && course.length > 0) {
      queries.push(Query.contains('brn', course));
    }

    // Add college filter if provided
    if (college && Array.isArray(college) && college.length > 0) {
      queries.push(Query.contains('con', college));
    }

    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        queries
      );
      return NextResponse.json(res.documents);
    } catch (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
