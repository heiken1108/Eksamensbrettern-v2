"use client";
import TaskBox from "@/components/TaskBox";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <TaskBox id={params.id} />
    </div>
  );
}
