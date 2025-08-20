import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";// adjust path if needed


export async function POST(req) {
  try {
    const body = await req.json();

    if (body.finalChoice === 'start_beginning') {
      const data =  await handleSubmission(body);
      return NextResponse.json({ success: true, data }, { status: 201 });
    }
    // else if (body.finalChoice === 'take_test') {
    //   const data = await handleLead(body);
    //   return NextResponse.json({ success: true, data }, { status: 201 });
    // }
  } catch (err) {
    console.error("Error saving submission:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


async function handleSubmission(body) {
    const supabase = await createClient();
   // ✅ Extract main student/child info
    const studentInfo = body.studentInfo  || {};
    const childInfo = body.childInfo || {};
    const parentInfo = body.parentInfo || {};

    const firstname = studentInfo.firstName || childInfo.firstName || "";
    const lastname = studentInfo.lastName || childInfo.lastName || "";
    const email = studentInfo.email  ||  "";
    const phone = studentInfo.phoneNumber || "";
    const country = studentInfo.country || parentInfo.country || "";
    const age = childInfo.age ? parseInt(childInfo.age, 10) : null;

    // ✅ Parent info
    const parent_name = parentInfo.parentName || null;
    const parent_email = parentInfo.email || null;
    const parent_whatsapp = parentInfo.whatsappNumber || null;

    // ✅ Context
    const language = body.language || null;
    const reason = body.reason || null;

    // ✅ Insert into Supabase
    const { data, error } = await supabase.from("submissions").insert([
      {
        firstname,
        lastname,
        email,
        phone,
        country,
        age,
        parent_name,
        parent_email,
        parent_whatsapp,
        language,
        reason,
      },
    ]);

    if (error) throw error;

    return data;
}
