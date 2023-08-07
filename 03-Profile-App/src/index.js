import { React, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const skills = [
  {
    skill: 'HTML+CSS',
    level: 'advanced',
    color: '#2662EA',
  },
  {
    skill: 'JavaScript',
    level: 'advanced',
    color: '#EFD81D',
  },
  {
    skill: 'Web Design',
    level: 'advanced',
    color: '#C3DCAF',
  },
  {
    skill: 'Git and GitHub',
    level: 'intermediate',
    color: '#E84F33',
  },
  {
    skill: 'React',
    level: 'advanced',
    color: '#60DAFB',
  },
  {
    skill: 'Svelte',
    level: 'beginner',
    color: '#FF3B00',
  },
]

function App() {
  return (
    <div className='card'>
      <Avatar />
      <div className='data'>
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  )
}

function Avatar({ photoName }) {
  return (
    <img
      className='avatar'
      src='images/My profile image.jpg'
      alt='Akash Profile'
    />
  )
}

function Intro() {
  return (
    <div>
      <h1>Akash Keshari</h1>
      <p>
        Full-stack web developer at Msys Technologies. When not coding, I enjoy
        having with friends and explore new places, to discuss any topics. Love
        watching Cricket as sports. Riding bikes can go as one of activities.
      </p>
    </div>
  )
}

function SkillList() {
  return (
    <div className='skill-list'>
      {skills.map((skill) => (
        <Skill skill={skill.skill} color={skill.color} level={skill.level} />
      ))}
    </div>
  )
}

function Skill({ skill, color, level }) {
  return (
    <div className='skill' style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>
        {level === 'beginner' && '👶'}
        {level === 'intermediate' && '👍'}
        {level === 'advanced' && '💪'}
      </span>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
