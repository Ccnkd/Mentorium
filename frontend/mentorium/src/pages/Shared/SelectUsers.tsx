import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export type SelectUserItem = {
  id: string;
  [key: string]: any;
};

type SelectUsersProps<T extends SelectUserItem> = {
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  fetchData: () => Promise<T[]>;
  renderLabel: (item: T) => React.ReactNode;
  title?: string;
};

export function SelectUsers<T extends SelectUserItem>({
  selectedIds,
  setSelectedIds,
  fetchData,
  renderLabel,
  title = 'Select Users',
}: SelectUsersProps<T>) {
  const [users, setUsers] = useState<T[]>([]);
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchData().then(setUsers).catch(console.error);
  }, [fetchData]);

  useEffect(() => {
    setTempSelected([...selectedIds]);
  }, [selectedIds]);

  const toggleSelection = (id: string) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAssign = () => {
    setSelectedIds(tempSelected);
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    setTempSelected(filteredUsers.map((u) => u.user_id));
  };

  const handleDeselectAll = () => {
    setTempSelected([]);
  };

  const filteredUsers = users.filter((user) => {
    const label = renderLabel(user);
    return label?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Assign</Button>
      </DialogTrigger>
      <DialogContent className="w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <br/>
          <Button variant="secondary" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button variant="ghost" onClick={handleDeselectAll}>
            Deselect All
          </Button>
        </div>

        <ScrollArea className="h-[400px] border-1 rounded-xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.user_id} className='font-secondary'>
                  <TableCell>
                    <Checkbox
                    className='shadow-none border-1'
                      checked={tempSelected.includes(user.user_id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempSelected((prev) => [...prev, user.user_id]);
                        } else {
                          setTempSelected((prev) => prev.filter((id) => id !== user.user_id));
                        }
                      }}
                      
                    />
                    
                  </TableCell>
                  <TableCell>{renderLabel(user)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter className="pt-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {tempSelected.length} user(s) selected
          </div>
          <Button onClick={handleAssign}>Assign</Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
