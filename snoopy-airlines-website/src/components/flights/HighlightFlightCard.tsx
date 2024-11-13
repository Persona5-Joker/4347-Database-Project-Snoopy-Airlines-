import { useState } from "react";
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
import SimpleFlightInfo from "./SimpleFlightInfo";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) {
      throw new Error("Something went wrong with the request");
    }
    return r.json();
  });

const HighlightFlightsCard = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { data: companies, error: modelsError } = useSWR(
    "/api/flight/company",
    fetcher
  );

  // Fetch the flights for the selected model
  const { data: flights, error: flightsError } = useSWR(
    selectedCompany ? `/api/flight/search/${selectedCompany}` : null,
    fetcher
  );

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <Card className="w-[1100px] min-h-[400px] mt-12">
      <CardHeader>
        <CardTitle>Want to see some of our highlighted flights?</CardTitle>
        <CardDescription>
          Feel free to explore each company and their corresponding past
          flights.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {modelsError && (
          <p className="text-red-500">Failed to load available models.</p>
        )}

        <Select
          onValueChange={handleCompanySelect}
          value={selectedCompany ?? ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an aircraft model" />
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
                No models available
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {selectedCompany && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">
              Flights for {selectedCompany}
            </h2>
            {flightsError && (
              <p className="mt-4 text-red-500">Failed to load flights.</p>
            )}
            {flights ? (
              <ul className="mt-4 space-y-2">
                {flights.flights.map(
                  (
                    flight: {
                      Flight_Number: string;
                      Model: string;
                      Origin: string;
                      Destination: string;
                    },
                    index: number
                  ) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <SimpleFlightInfo flight={flight} />
                    </li>
                  )
                )}
              </ul>
            ) : (
              <>
                {!flightsError && (
                  <p className="mt-4 text-gray-500">Loading flights...</p>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HighlightFlightsCard;
