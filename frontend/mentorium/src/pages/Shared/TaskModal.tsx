import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import type { Task } from "@/utils/types";
import { Checkbox } from "@/components/ui/checkbox";
import { PriorityBadge } from "../components/PriorityBadge";

type TaskModalProps = {
  task: Task;
  onClose: () => void;
};

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {

  const date = new Date(task.due_date);

  const formatted = date.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <Card className="w-[60vw] h-[70vh] max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
              <InfoIcon className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-grey font-medium">Details</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            X
          </Button>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex-1 space-y-4 pr-4">
              <div className="flex items-center gap-3">
                <Checkbox className="size-6 rounded-2xl"/>
                <p className="font-medium text-grey text-3xl">{task.title}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Priority</p>
                <PriorityBadge priority={task.priority}/>
              </div>
              <div>
                  <ul className="text-sm text-gray-700">
                    {task.assignees.map((assignee, index) => (
                      <li key={index}>
                        {assignee.users.firstname} {assignee.users.lastname}
                      </li>
                    ))}
                  </ul>
              </div>
            </div>

            <div className="flex-1 space-y-4 pl-4 pt-4 md:pt-0">
              <div>
                <p className="text-muted-foreground text-sm">Due Date</p>
                <p className="font-medium text-grey text-xl">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Assignees</p>
                <p className="font-medium text-grey text-xl">
                  Kwame Nkrumah University of Science & Technology
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskModal;
