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

export async function PATCH(req, { params }) {
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
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Team ID required" }, { status: 400 });
    }
    const team = await Team.findOne({ _id: id, userId });
    if (!team) {
      return NextResponse.json({ success: false, message: "Team not found" }, { status: 404 });
    }
    const body = await req.json();
    const { teamName, season, games, plays, session } = body;
    if (teamName !== undefined) team.teamName = String(teamName).trim() || team.teamName;
    if (season !== undefined) team.season = String(season).trim() || team.season;
    if (session !== undefined && String(session).trim().length === 4) team.session = String(session).trim();
    if (games !== undefined) {
      const gamesNum = Number(games);
      if (!Number.isNaN(gamesNum) && gamesNum >= 0) team.games = gamesNum;
    }
    if (plays !== undefined) {
      const playsNum = Number(plays);
      if (!Number.isNaN(playsNum) && playsNum >= 0) team.plays = playsNum;
    }
    if (!team.teamName?.trim() || !team.season?.trim() || !team.session?.trim()) {
      return NextResponse.json(
        { success: false, message: "Team name, season, and session (year) are required" },
        { status: 400 }
      );
    }
    await team.save();
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
    console.error("Teams PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Team ID required" }, { status: 400 });
    }
    const team = await Team.findOneAndDelete({ _id: id, userId });
    if (!team) {
      return NextResponse.json({ success: false, message: "Team not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Team deleted" });
  } catch (err) {
    console.error("Teams DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete team" },
      { status: 500 }
    );
  }
}
