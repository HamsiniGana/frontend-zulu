import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import PlantInfoCard from "../components/PlantInfoCard";

jest.mock("../components/plantsAndImagesMap.js", () => ({
  plantAndImgMap: {
    onion: "onion.jpeg",
    default: "default.jpeg",
  },
}));

const mockSetListPlant = jest.fn();
const mockSetListPlantInfo = jest.fn();

test("Check if plant info card has the right values", () => {
  render(
    <PlantInfoCard
      attributes={"grow on large scale"}
      category={"vegetables"}
      cliz={"tropical wet & dry"}
      life_form={"herb"}
      life_span={"biennial"}
      gmax={175}
      gmin={85}
      phmax={8.3}
      phmin={4.3}
      ropmn={350}
      ropmx={600}
      topmn={12}
      topmx={25}
      photo={"short day"}
      texture={"medium"}
      plant_name={"onion"}
      setListPlant={mockSetListPlant}
      setListPlantInfo={mockSetListPlantInfo}
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

  const gmax = screen.getByTestId("gmax-div");
  expect(gmax).toBeInTheDocument();
  const gmaxTitle = within(gmax).getByText("Gmax:");
  const gmaxVal = within(gmax).getByText("175");
  expect(gmaxTitle).toBeInTheDocument();
  expect(gmaxVal).toBeInTheDocument();

  const gmin = screen.getByTestId("gmin-div");
  expect(gmin).toBeInTheDocument();
  const gminTitle = within(gmin).getByText("Gmin:");
  const gminVal = within(gmin).getByText("85");
  expect(gminTitle).toBeInTheDocument();
  expect(gminVal).toBeInTheDocument();

  const phmax = screen.getByTestId("phmax-div");
  expect(phmax).toBeInTheDocument();
  const phmaxTitle = within(phmax).getByText("Phmax:");
  const phmaxVal = within(phmax).getByText("8.3");
  expect(phmaxTitle).toBeInTheDocument();
  expect(phmaxVal).toBeInTheDocument();

  const phmin = screen.getByTestId("phmin-div");
  expect(phmin).toBeInTheDocument();
  const phminTitle = within(phmin).getByText("Phmin:");
  const phminVal = within(phmin).getByText("4.3");
  expect(phminTitle).toBeInTheDocument();
  expect(phminVal).toBeInTheDocument();

  const ropmn = screen.getByTestId("ropmn-div");
  expect(ropmn).toBeInTheDocument();
  const ropmnTitle = within(ropmn).getByText("Ropmn:");
  const ropmnVal = within(ropmn).getByText("350");
  expect(ropmnTitle).toBeInTheDocument();
  expect(ropmnVal).toBeInTheDocument();

  const ropmx = screen.getByTestId("ropmx-div");
  expect(ropmx).toBeInTheDocument();
  const ropmxTitle = within(ropmx).getByText("Ropmx:");
  const ropmxVal = within(ropmx).getByText("600");
  expect(ropmxTitle).toBeInTheDocument();
  expect(ropmxVal).toBeInTheDocument();

  const topmn = screen.getByTestId("topmn-div");
  expect(topmn).toBeInTheDocument();
  const topmnTitle = within(topmn).getByText("Topmn:");
  const topmnVal = within(topmn).getByText("12");
  expect(topmnTitle).toBeInTheDocument();
  expect(topmnVal).toBeInTheDocument();

  const topmx = screen.getByTestId("topmx-div");
  expect(topmx).toBeInTheDocument();
  const topmxTitle = within(topmx).getByText("Topmx:");
  const topmxVal = within(topmx).getByText("25");
  expect(topmxTitle).toBeInTheDocument();
  expect(topmxVal).toBeInTheDocument();

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
    <PlantInfoCard
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
      setListPlant={mockSetListPlant}
      setListPlantInfo={mockSetListPlantInfo}
    />,
  );

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "default.jpeg");
});

test("Check if plant info card closes when close button is clicked", () => {
  render(
    <PlantInfoCard
      attributes={"grow on large scale"}
      category={"vegetables"}
      cliz={"tropical wet & dry"}
      life_form={"herb"}
      life_span={"biennial"}
      gmax={175}
      gmin={85}
      phmax={8.3}
      phmin={4.3}
      ropmn={350}
      ropmx={600}
      topmn={12}
      topmx={25}
      photo={"short day"}
      texture={"medium"}
      plant_name={"onion"}
      setListPlant={mockSetListPlant}
      setListPlantInfo={mockSetListPlantInfo}
    />,
  );

  const plantInfoCard = screen.queryByText("ONION");
  expect(plantInfoCard).toBeVisible();

  const closeBtn = screen.getByRole("button", { name: /Close/i });
  expect(closeBtn).toBeVisible();

  fireEvent.click(closeBtn);

  waitFor(() => {
    expect(plantInfoCard).not.toBeInTheDocument();
  });
});
