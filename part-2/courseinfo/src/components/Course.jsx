const Course = ({ course: { name, parts } }) => (
  <div>
    <Header course={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
);

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

const Total = ({ parts }) => {
  const total = parts.reduce(
    (total, currentPart) => total + currentPart.exercises,
    0
  );

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

export default Course;
