import { incrementLinkClick } from "@/app/app/links/new/actions";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { linkId, url } = await req.json();

    if (!linkId || !url) {
      return NextResponse.json(
        { error: "linkId e url são obrigatórios" },
        { status: 400 },
      );
    }

    await incrementLinkClick(linkId, url);

    return NextResponse.json({ success: true, redirect: url });
  } catch (error) {
    console.error("Erro na API de clique:", error);
    return NextResponse.json(
      { error: "Erro ao registrar clique" },
      { status: 500 },
    );
  }
}
