import Link from "next/link"

interface ExerciseCategoryProps{
    id: string;
    name: string;
    image: string | undefined;
}

export default function ExerciseCategory({ id, name, image }: ExerciseCategoryProps){
    return (
        <li className="relative group w-32 h-32 m-4 overflow-hidden rounded-lg shadow-lg">
            <Link href={`/exercises/${id}`}>
                <div className="w-full h-full">
                    <img src={image} alt={name} className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-lg font-semibold text-center px-2">{name}</h3>
                    </div>
                </div>
            </Link>
        </li>
    )
}