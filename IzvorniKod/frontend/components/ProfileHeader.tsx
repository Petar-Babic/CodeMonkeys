import React from "react";

export default function ProfileHeader() {
    const username = "Luka Kordić"; // Placeholder korisničko ime
    const completedWorkouts = 99; // Placeholder broj završenih treninga

    // Generating initials from the username (will be used if no image is available)
    const initials = username
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase();

    return (
        <div className="w-full bg-black text-white py-8 flex flex-col items-center justify-center">
            {/* Profile Circle with Initials */}
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 text-2xl font-bold text-white">
                {initials}
            </div>

            {/* Username */}
            <h2 className="mt-4 text-xl font-bold">{username}</h2>

            {/* Workouts Completed */}
            <p className="text-gray-400 text-sm">Workouts Completed: {completedWorkouts}</p>
        </div>
    );
}
