import { Link, Navigate } from 'react-router-dom'
import { ToolbarButton } from 'shared/ui/buttons/toolbar-button/toolbar-button'

export const RootPage = () => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center', 
        width:'100vw',
        height:'100vh'
      }}>
      <Link to={'/viewer'}>
        <ToolbarButton text='Open PDF' />
      </Link>
    </div>
  )
}
