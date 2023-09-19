import supabase from "./supabase";

export async function getScenarios() {
  const { data, error } = await supabase.from("Scenarios").select("*");

  if (error) {
    console.error(error);
    throw new Error("Scenario could not be loaded");
  }

  return data;
}

export async function getStartingRange(scenarioId) {
  if (scenarioId === null) {
    return null;
  }

  const { data, error } = await supabase
    .from("Scenarios")
    .select("*")
    .eq("id", `${scenarioId}`);

  if (error) {
    console.error(error);
    throw new Error("Scenario could not be loaded");
  }

  return data;
}
