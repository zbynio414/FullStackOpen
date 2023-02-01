const Courses = ({courses})=> {
    return(
      <div>
        {courses.map(course =>
          <Course key={course.id} course={course} />
          )}
      </div>
    )
  }
  
const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  
const Header = ({name}) => <h2>{name}</h2>
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
        
      </div>
    )
  }
  
const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
const Total = ({parts}) => {
    const nb_of_exer =  parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (<p><b>Total of {nb_of_exer} exercises</b></p>)
    }

export default Courses