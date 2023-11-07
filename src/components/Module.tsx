import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLeasons: number;
}

export function Module({ title, amountOfLeasons, moduleIndex }: ModuleProps) {
  const dispatch = useAppDispatch();

  const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    return { currentLessonIndex, currentModuleIndex };
  });

  const lessons = useAppSelector((state) => {
    return state.player.courses?.modules[moduleIndex].lessons;
  });

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sx">
          {moduleIndex + 1}
        </div>

        <div className="flex  flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLeasons} aulas</span>
        </div>

        <ChevronDown className="h-5 w-5 ml-auto tex-zinc-400 group-data-[state=open]:rotate-180 transition" />
      </Collapsible.Trigger>

      <Collapsible.Content className="CollapsibleContent">
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons
            ? lessons.map((lesson, index) => {
                const isCurrent =
                  currentModuleIndex === moduleIndex &&
                  currentLessonIndex === index;

                return (
                  <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    durantion={lesson.duration}
                    onPlay={() => dispatch(play([moduleIndex, index]))}
                    isCurrent={isCurrent}
                  />
                );
              })
            : null}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
