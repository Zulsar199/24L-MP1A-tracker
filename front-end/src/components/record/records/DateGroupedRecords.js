import { TransactionCheckbox } from "./TransactionCheckbox";

export const DateGroupedRecords = ({ records, text }) => {
  return (
    <div className="mb-6">
      {records.length > 0 && (
        <>
          <p className="mb-3 text-base font-semibold">{text}</p>
          {records?.map((record) => (
            <TransactionCheckbox key={record.id} record={record} />
          ))}
        </>
      )}
    </div>
  );
};
