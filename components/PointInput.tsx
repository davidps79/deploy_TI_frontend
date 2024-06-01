import React from 'react'
import { Button } from './ui/button'

const PointInput = ({ disabled, points, setPoints }: { disabled: boolean, points: number, setPoints: any }) => {
    return (
        <div className="w-fit flex gap-4 items-center">
            <Button disabled={disabled} onClick={() => setPoints(points - 1)} variant="secondary" size="icon">
                -
            </Button>
            <span className='w-4 flex justify-center'>
                {points}
            </span>
            <Button disabled={disabled} onClick={() => setPoints(points + 1)} variant="secondary" size="icon">
                +
            </Button>
        </div>
    )
}

export default PointInput