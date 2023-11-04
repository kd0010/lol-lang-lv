import { FunctionComponent, render } from 'preact'
import { Test1 } from './Test1'
import { Test2 } from './Test2'
import { Test3 } from './Test3'

interface Props {
  
}

export const App: FunctionComponent<Props> = ({
  
}) => {
  return (
    <div>
      <Test1 />
      {/* <Test2 /> */}
      {/* <Test3 /> */}
    </div>
  )
}

render(
  <App />,
  document.getElementById('root')!,
)
