import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Team from "@/models/Team";
import User from "@/models/User";
import { NextResponse } from "next/server";

function getAuthUserId(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.userId || null;
}

export async function GET(req) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const teams = await Team.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, teams });
  } catch (err) {
    console.error("Teams GET error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load teams" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }
    const body = await req.json();
    const { teamName, season, games, plays, session } = body;
    if (!teamName?.trim() || !season?.trim() || session?.trim?.()?.length !== 4) {
      return NextResponse.json(
        { success: false, message: "Team name, season, and session (year) are required" },
        { status: 400 }
      );
    }
    const gamesNum = Number(games);
    const playsNum = Number(plays);
    if (Number.isNaN(gamesNum) || gamesNum < 0 || Number.isNaN(playsNum) || playsNum < 0) {
      return NextResponse.json(
        { success: false, message: "Games and plays must be non-negative numbers" },
        { status: 400 }
      );
    }
    const team = await Team.create({
      userId,
      teamName: teamName.trim(),
      season: season.trim(),
      games: gamesNum,
      plays: playsNum,
      session: String(session).trim(),
    });
    return NextResponse.json({
      success: true,
      team: {
        _id: team._id,
        teamName: team.teamName,
        season: team.season,
        games: team.games,
        plays: team.plays,
        session: team.session,
        createdAt: team.createdAt,
      },
    });
  } catch (err) {
    console.error("Teams POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create team" },
      { status: 500 }
    );
  }
}
