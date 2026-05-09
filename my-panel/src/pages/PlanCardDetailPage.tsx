import { useParams } from "react-router-dom";
import PlanCardDetail from "../Component/Plan/PlanCardDetail";

const PlanCardDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
      <PlanCardDetail id={id} />
    </div>
  );
};

export default PlanCardDetailPage;
