import gsap from 'gsap'
import { useRef, useCallback } from 'react'
import './SolidTitle.css'

function SolidTitle({ titleText }) {
  const title = useRef()

  const handleMouseEnter = useCallback(() => {
    gsap.to('.distort feDisplacementMap', 1, {
      attr: {
        scale: 50,
      },
      ease: 'circ.out',
    })
    gsap.to(
      '.distort feTurbulence',
      1,
      {
        attr: {
          baseFrequency: '2.08 .08',
        },
        ease: 'circ.out',
      },
      1
    )
    gsap.to(title.current, 1, {
      fontVariationSettings: "'wght' 650",
      ease: 'back.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(
      '.distort feDisplacementMap',
      1,
      {
        attr: {
          scale: 0,
        },
        ease: 'circ.out',
      },
      1
    )
    gsap.to(
      '.distort feTurbulence',
      1,
      {
        attr: {
          baseFrequency: '2.01 .01',
        },
        ease: 'circ.out',
      },
      1
    )
    gsap.to(
      title.current,
      1,
      {
        fontVariationSettings: "'wght' 700",
        ease: 'back.out',
      },
      1
    )
  }, [])

  return (
    <>
      <h1
        className='firstTitle'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={title}
      >
        {titleText}
      </h1>
      <svg className='distort'>
        <filter id='distortionFilter'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='2.01 .01'
            numOctaves='5'
            seed='2'
            stitchTiles='noStitch'
            x='0%'
            y='0%'
            width='100%'
            height='100%'
            result='noise'
          ></feTurbulence>
          <feDisplacementMap
            in='SourceGraphic'
            in2='noise'
            scale='0'
            xChannelSelector='R'
            yChannelSelector='B'
            x='0%'
            y='0%'
            width='100%'
            height='100%'
            filterUnits='userSpaceOnUse'
          ></feDisplacementMap>
        </filter>
      </svg>
    </>
  )
}

export default SolidTitle
