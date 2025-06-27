import { Button } from "./button";

export default function TemplateButtons() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button className="w-fit cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-sm transition-theme">
        Build a chess app
      </Button>
      <Button className="w-fit cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-sm transition-theme">
        Create a todo app
      </Button>
      <Button className="w-fit cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-sm transition-theme">
        Create a docs app
      </Button>
      <Button className="w-fit cursor-pointer border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-sm transition-theme">
        Creaet a base app
      </Button>
    </div>
  );
}
