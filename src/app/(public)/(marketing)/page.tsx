"use client";
import { useGetMe } from "@/hooks";

export default function HomePage() {

    const { data, isLoading } = useGetMe();
    return (
        <div>
            <h1>This is Homepage</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}