import { render, screen, within } from "@testing-library/react";
import CompareCard from "../components/CompareCard";

jest.mock("../components/plantsAndImagesMap.js", () => ({
  plantAndImgMap: {
    onion: "onion.jpeg",
    default: "default.jpeg",
  },
}));

test("Check if compare card has the right values", () => {
  render(
    <CompareCard
      attributes={"grow on large scale"}
      category={"vegetables"}
      cliz={"tropical wet & dry"}
      gavg={130}
      phavg={6.3}
      tavg={18.5}
      ktmp={""}
      ravg={475}
      ktmpr={""}
      life_form={"herb"}
      life_span={"biennial"}
      //   biennial={''}
      photo={"short day"}
      texture={"medium"}
      plant_name={"onion"}
    />,
  );

  expect(screen.getByText("ONION")).toBeInTheDocument();

  const attributes = screen.getByTestId("attributes-div");
  expect(attributes).toBeInTheDocument();
  const attributesTitle = within(attributes).getByText("Attributes:");
  const attributesVal = within(attributes).getByText("grow on large scale");
  expect(attributesTitle).toBeInTheDocument();
  expect(attributesVal).toBeInTheDocument();

  const category = screen.getByTestId("category-div");
  expect(category).toBeInTheDocument();
  const categoryTitle = within(category).getByText("Category:");
  const categoryVal = within(category).getByText("vegetables");
  expect(categoryTitle).toBeInTheDocument();
  expect(categoryVal).toBeInTheDocument();

  const cliz = screen.getByTestId("cliz-div");
  expect(cliz).toBeInTheDocument();
  const clizTitle = within(cliz).getByText("Climate zone:");
  const clizVal = within(cliz).getByText("tropical wet & dry");
  expect(clizTitle).toBeInTheDocument();
  expect(clizVal).toBeInTheDocument();

  const gavg = screen.getByTestId("gavg-div");
  expect(gavg).toBeInTheDocument();
  const gavgTitle = within(gavg).getByText("Growth avg:");
  const gavgVal = within(gavg).getByText("130");
  expect(gavgTitle).toBeInTheDocument();
  expect(gavgVal).toBeInTheDocument();

  const soilPh = screen.getByTestId("phavg-div");
  expect(soilPh).toBeInTheDocument();
  const soilPhTitle = within(soilPh).getByText("Soil ph avg:");
  const soilPhVal = within(soilPh).getByText("6.3");
  expect(soilPhTitle).toBeInTheDocument();
  expect(soilPhVal).toBeInTheDocument();

  const tempAvg = screen.getByTestId("tavg-div");
  expect(tempAvg).toBeInTheDocument();
  const tempAvgTitle = within(tempAvg).getByText("Temp avg:");
  const tempAvgVal = within(tempAvg).getByText("18.5");
  expect(tempAvgTitle).toBeInTheDocument();
  expect(tempAvgVal).toBeInTheDocument();

  const rainAvg = screen.getByTestId("ravg-div");
  expect(rainAvg).toBeInTheDocument();
  const rainAvgTitle = within(rainAvg).getByText("Rainfall avg:");
  const rainAvgVal = within(rainAvg).getByText("475");
  expect(rainAvgTitle).toBeInTheDocument();
  expect(rainAvgVal).toBeInTheDocument();

  const ktmp = screen.getByTestId("ktmp-div");
  expect(ktmp).toBeInTheDocument();
  const ktmpTitle = within(ktmp).getByText("Ktmp:");
  expect(ktmpTitle).toBeInTheDocument();

  const ktmpr = screen.getByTestId("ktmpr-div");
  expect(ktmpr).toBeInTheDocument();
  const ktmprTitle = within(ktmpr).getByText("Ktmpr:");
  expect(ktmprTitle).toBeInTheDocument();

  const lifeForm = screen.getByTestId("life-form-div");
  expect(lifeForm).toBeInTheDocument();
  const lifeFormTitle = within(lifeForm).getByText("Life form:");
  const lifeFormVal = within(lifeForm).getByText("herb");
  expect(lifeFormTitle).toBeInTheDocument();
  expect(lifeFormVal).toBeInTheDocument();

  const lifeSpan = screen.getByTestId("life-span-div");
  expect(lifeSpan).toBeInTheDocument();
  const lifeSpanTitle = within(lifeSpan).getByText("Life span:");
  const lifeSpanVal = within(lifeSpan).getByText("biennial");
  expect(lifeSpanTitle).toBeInTheDocument();
  expect(lifeSpanVal).toBeInTheDocument();

  const photo = screen.getByTestId("photo-div");
  expect(photo).toBeInTheDocument();
  const photoTitle = within(photo).getByText("Photo:");
  const photoVal = within(photo).getByText("short day");
  expect(photoTitle).toBeInTheDocument();
  expect(photoVal).toBeInTheDocument();

  const texture = screen.getByTestId("texture-div");
  expect(texture).toBeInTheDocument();
  const textureTitle = within(texture).getByText("Texture:");
  const textureVal = within(texture).getByText("medium");
  expect(textureTitle).toBeInTheDocument();
  expect(textureVal).toBeInTheDocument();

  const plantImg = screen.getByRole("img");
  expect(plantImg).toHaveAttribute("src", "onion.jpeg");
});

test("Check if default image is used for a plant that has not been mapped to an image but exists in the database", () => {
  render(
    <CompareCard
      attributes={"none"}
      category={"pulses"}
      cliz={"tropical wet & dry"}
      gavg={85}
      phavg={6.3}
      tavg={28.5}
      ktmp={""}
      ravg={775}
      ktmpr={""}
      life_form={"herb"}
      life_span={"perennial"}
      //   biennial={''}
      photo={"short day"}
      texture={"medium"}
      plant_name={"mungbohne"}
    />,
  );

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "default.jpeg");
});
