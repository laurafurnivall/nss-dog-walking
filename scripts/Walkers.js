import { getWalkers, getWalkerCities, getCities } from "./database.js"

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {

            const [, walkerId] = itemClicked.id.split("--")

            const filterWalkerCitiesByWalker = (walker) => {
                let assignmen = []
                for (let assignment of walkerCities) {
                    if (walker.id === assignment.walkerId) {
                        assignmen.push(assignment)
                    }
                } 
                return assignmen
            }
            
            
            const assignedCityNames = (assignments) => {
                let cityNames = ""
                for (let assignment of assignments) {
                    for (const city of cities) {
                        if (city.id === assignment.cityId) {
                            cityNames = `${cityNames} and ${city.name}`
                        }
                    }
                }
                return cityNames
            }

            for (const walker of walkers) {
                 if (walker.id === parseInt(walkerId)) {
                    const assignments = filterWalkerCitiesByWalker(walker)
                    const cities = assignedCityNames(assignments)

                    window.alert(`${walker.name} services ${cities}`)
                }
            }
        }
    }
)



export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    return walkerHTML += "</ul>"

}

