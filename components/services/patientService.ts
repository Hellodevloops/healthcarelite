export const patientService = {
    async createPatient(data: any) {
      console.log("Sending data to API:", data);
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("API response:", result);
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to create patient");
      }
  
      return result;
    },
  };