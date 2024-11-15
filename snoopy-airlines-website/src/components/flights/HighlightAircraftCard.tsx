import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AircraftInfo from "./AircraftInfo";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) {
      throw new Error("Something went wrong with the request");
    }
    return r.json();
  });

const HighlightAircraftCard = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { data: companies, error: companiesError } = useSWR(
    "/api/aircraft/company",
    fetcher
  );

  // Fetch the aircraft models for the selected company
  const { data: aircraft, error: aircraftError } = useSWR(
    selectedCompany ? `/api/aircraft/list/company/${selectedCompany}` : null,
    fetcher
  );

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
  };

  // Update the selected company when companies data is available
  useEffect(() => {
    if (companies && companies.length > 0) {
      setSelectedCompany(companies[0]);
    }
  }, [companies]);

  return (
    <Card className="w-[1100px] min-h-[400px] mt-12">
      <CardHeader>
        <CardTitle>Explore our highlighted aircraft models</CardTitle>
        <CardDescription>
          Select a company to view their available aircraft models.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {companiesError && (
          <p className="text-red-500">Failed to load available companies.</p>
        )}

        <Select
          onValueChange={handleCompanySelect}
          value={selectedCompany ?? ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an aircraft company" />
          </SelectTrigger>
          <SelectContent>
            {companies ? (
              companies.map((company: string) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="disabled" disabled>
                No companies available
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {selectedCompany && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">
              Aircraft for {selectedCompany}
            </h2>
            {aircraftError && (
              <p className="mt-4 text-red-500">Failed to load aircraft data.</p>
            )}
            {aircraft ? (
              <ul className="mt-4 space-y-2">
                {aircraft.models.map(
                  (
                    aircraft: {
                      Model: string;
                      Has_Wifi: number;
                      Has_Power_Outlets: number;
                      Number_Of_Seats: number;
                    },
                    index: number
                  ) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <AircraftInfo aircraft={aircraft} />
                    </li>
                  )
                )}
              </ul>
            ) : (
              <>
                {!aircraftError && (
                  <p className="mt-4 text-gray-500">Loading aircraft...</p>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HighlightAircraftCard;
