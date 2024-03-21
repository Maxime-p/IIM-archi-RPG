// EditScenario/index.tsx
import EditScenarioBody from './EditScenarioBody'
import EditScenarioHeader from './EditScenarioHeader'
import './EditScenario.scss'
import { useState } from 'react'
import Scenario from '../../types/Scenario.ts'
import { api } from '../../services/api.ts'
import SideBar from '../SideBar/SideBar'
import SidebarImg from '../../assets/CardsHP1.jpeg'
import { ia } from '../../services/ia.ts'

/**
 * EditScenario component is responsible for rendering the scenario editing page.
 * The page includes a sidebar, a header for creating a scenario, and a body for displaying the details of the scenario.
 * The component uses the useState hook to manage the state of the scenario and the loading state.
 * When the form in the header is submitted, the handleGenerate function is called.
 * The handleGenerate function sends a post request to the "sentinelle/briefs" endpoint with the anecdote and agent number as parameters.
 * If the request is successful, the scenario is updated with the response data.
 * If the request fails, an error message is logged to the console.
 * While the request is being processed, a loading message is displayed.
 * If the scenario is null, a message is displayed to the user to generate a scenario.
 * Otherwise, the details of the scenario are displayed.
 * @returns {React.FC} The rendered component
 */
function EditScenario() {
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async ({
    anecdote,
    agentNames,
  }: {
    anecdote: string
    agentNames: string
  }) => {
    setIsLoading(true)
    try {
      const { data: scenario } = await ia.post<Scenario>('generate', {
        prompt: anecdote,
        characters: agentNames.split(','),
      })
      scenario.name = (scenario as unknown as { title: string })['title'] // TODO Do better typing
      scenario.scenes = scenario.scenes.map((scene) => {
        scene.title = (scene as unknown as { name: string })['name'] // TODO Do better typing
        return scene
      })
      setScenario(scenario)

      const promises = scenario.scenes.map(async (scene) => {
        const { data: result } = await api.post<{ data: { id: string } }>(
          'scenario-scenes',
          {
            data: scene,
          }
        )
        return result.data.id
      })
      const sceneIds = await Promise.all(promises)
      await api.post('scenarios', {
        data: {
          name: scenario.name,
          description: scenario.description,
          scenes: sceneIds,
        },
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="edit-scenario-container">
      <div className="side-bar-container">
        <SideBar pagesName="Edit Scenario" imgUrl={SidebarImg} />
      </div>
      <div className="edit-scenario-main">
        <EditScenarioHeader onSubmit={handleGenerate} />
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <EditScenarioBody theScenario={scenario} />
        )}
      </div>
      {scenario ? (
        <div className="start-scenario">
          <h2>Go with this scenario</h2>
          <p>{scenario?.name}</p>
        </div>
      ) : (
        <div className="start-scenario">
          <h2>You have to generate a scenario</h2>
        </div>
      )}
    </div>
  )
}

export default EditScenario
