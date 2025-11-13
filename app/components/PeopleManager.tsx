import { useState } from "react";
import type { Person } from "~/types/person";
import { PersonChip } from "./PersonChip";

interface PeopleManagerProps {
  people: Person[];
  onAddPerson: (person: Person) => void;
  onRemovePerson: (id: string) => void;
}

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

export function PeopleManager({ people, onAddPerson, onRemovePerson }: PeopleManagerProps) {
  const [nameInput, setNameInput] = useState("");

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    
    if (!trimmedName) return;
    
    if (people.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert("This person is already added!");
      return;
    }

    const newPerson: Person = {
      id: crypto.randomUUID(),
      name: trimmedName,
      color: COLORS[people.length % COLORS.length],
    };

    onAddPerson(newPerson);
    setNameInput("");
  };

  return (
    <div>
      {/* Input form */}
      <form onSubmit={handleAddPerson} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter person's name"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* People chips */}
      {people.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {people.map((person) => (
            <PersonChip
              key={person.id}
              name={person.name}
              color={person.color}
              onRemove={() => onRemovePerson(person.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No people added yet. Add someone to get started!
        </p>
      )}
    </div>
  );
}
