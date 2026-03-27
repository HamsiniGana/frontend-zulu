import { fireEvent, render, screen, within } from '@testing-library/react';
import ClosableTabs from '../components/ClosableTabs';

test('Check if closable tabs are rendered with the right plant name and close buttons', () => {
    const mockSetPlants = jest.fn()
    const mockSetPlantsInfo = jest.fn()

    render(<ClosableTabs plant={"tomato"} setPlants={mockSetPlants} setPlantsInfo={mockSetPlantsInfo}/>)
    render(<ClosableTabs plant={"garlic"} setPlants={mockSetPlants} setPlantsInfo={mockSetPlantsInfo}/>)

    const tabValue = screen.getByText("tomato")
    expect(tabValue).toBeInTheDocument()

    const tabValue2 = screen.getByText("garlic")
    expect(tabValue2).toBeInTheDocument()

    const crossBtn = screen.queryAllByRole("button")
    expect(crossBtn).toHaveLength(2)
})

test('Check if closable tabs are closed when the close button is clicked', () => {
    const mockSetPlants = jest.fn()
    const mockSetPlantsInfo = jest.fn()

    render(<ClosableTabs plant={"tomato"} setPlants={mockSetPlants} setPlantsInfo={mockSetPlantsInfo}/>)
    render(<ClosableTabs plant={"garlic"} setPlants={mockSetPlants} setPlantsInfo={mockSetPlantsInfo}/>)

    // const tomatoHeading = screen.getByText("tomato")
    const tomatoContainer = screen.getByTestId("closable-tab-div-tomato")
    const crossBtn = within(tomatoContainer).getByRole("button")

    fireEvent.click(crossBtn)

    expect(mockSetPlants).toHaveBeenCalled()
    expect(mockSetPlantsInfo).toHaveBeenCalled()

    const updateFn = mockSetPlants.mock.calls[0][0]

    const prevState = ["tomato", "garlic"]

    const currState = updateFn(prevState)

    expect(currState).toEqual(["garlic"])
})
