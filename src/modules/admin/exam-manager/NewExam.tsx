import ExamDetailSection from './ExamDetailSection';

export default function NewExam() {
  return (
    <div className="flex w-full flex-col justify-center items-center space-y-5">
      <h1 className="font-bold text-3xl">Create new exam</h1>
      <ExamDetailSection />
    </div>
  );
}
