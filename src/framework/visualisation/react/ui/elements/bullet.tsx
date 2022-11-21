interface PropsUIBullet {
  color?: string
  children: JSX.Element
  frameSize?: string
}

export const Bullet = ({ color = 'bg-primary', frameSize = 'w-7 h-9', children }: PropsUIBullet): JSX.Element => {
  return (
    <div className='flex flex-row'>
      <div className={`flex flex-row items-center flex-shrink-0 ${frameSize}`}>
        <div className={`w-10px h-10px rounded-full overflow-hidden ${color}`} />
      </div>
      {children}
    </div>
  )
}
