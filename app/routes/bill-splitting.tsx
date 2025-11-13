import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { Bill } from "~/types/bill";
import { PageContainer } from "~/components/PageContainer";
import { Card } from "~/components/Card";
import { CardHeader } from "~/components/CardHeader";
import { BillItemsList } from "~/components/BillItemsList";
import { BillTotal } from "~/components/BillTotal";
import { PeopleManager } from "~/components/PeopleManager";
import { BillSummary } from "~/components/BillSummary";
import type { Person } from "~/types/person";

export function meta() {
  return [
    { title: "Split Bill - Bill Splitter" },
    { name: "description", content: "Split your bill between friends" },
  ];
}

export default function BillSplitting() {
  const location = useLocation();
  const bill = location.state?.bill as Bill | undefined;
  const [people, setPeople] = useState<Person[]>([]);
  const [splits, setSplits] = useState<Record<string, number>>({});

  const handleAddPerson = (person: Person) => {
    setPeople([...people, person]);
  };

  const handleRemovePerson = (id: string) => {
    setPeople(people.filter((p) => p.id !== id));
    // Clean up splits for removed person
    const newSplits = { ...splits };
    Object.keys(newSplits).forEach((key) => {
      if (key.includes(id)) {
        delete newSplits[key];
      }
    });
    setSplits(newSplits);
  };

  const handleSplitChange = (
    itemIndex: number,
    personId: string,
    factor: number
  ) => {
    const splitKey = `${itemIndex}-${personId}`;
    setSplits({ ...splits, [splitKey]: factor });
  };

  // Redirect if no bill data
  if (!bill) {
    return (
      <PageContainer>
        <Card>
          <CardHeader
            title="No Bill Data"
            subtitle="Please upload a bill first."
          />
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to upload
          </Link>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to upload
        </Link>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader
            title="People involved"
            subtitle="Add people to split the bill with"
          />
          <PeopleManager
            people={people}
            onAddPerson={handleAddPerson}
            onRemovePerson={handleRemovePerson}
          />
        </Card>

        <Card>
          <CardHeader
            title="Bill Splitting"
            subtitle={`${bill.items.length} items found in your bill`}
          />

          <BillItemsList
            items={bill.items}
            people={people}
            splits={splits}
            onSplitChange={handleSplitChange}
          />

          <BillTotal items={bill.items} />
        </Card>

        <Card>
          <CardHeader
            title="Summary"
            subtitle="Overview of each person's total amount"
          />
          <BillSummary items={bill.items} people={people} splits={splits} />
        </Card>
      </div>
    </PageContainer>
  );
}
