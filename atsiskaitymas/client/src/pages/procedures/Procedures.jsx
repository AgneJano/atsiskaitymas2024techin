import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProceduresSection = styled.section`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #025159; 
`;

const ProceduresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProcedureCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ProcedureImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProcedureInfo = styled.div`
  padding: 20px;
`;

const ProcedureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #025159; 
`;

const ProcedureDescription = styled.div`
  font-size: 1rem;
  color: #666666; 
`;

const Procedures = () => {
  const [procedures, setProcedures] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/procedures/`);
        setProcedures(response.data);
      } catch (error) {
        console.error("Error fetching procedures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  return (
    <Container>
      <ProceduresSection>
        <SectionTitle>All Procedures</SectionTitle>
        <ProceduresList>
          {procedures ? (
            procedures.map((procedure) => (
              <ProcedureCard
                key={procedure.id}
                onClick={() => navigate(`/procedures/${procedure.id}`)}
              >
                <ProcedureImage src={procedure.image} alt={procedure.title} />
                <ProcedureInfo>
                  <ProcedureTitle>{procedure.title}</ProcedureTitle>
                  <ProcedureDescription>{procedure.description}</ProcedureDescription>
                </ProcedureInfo>
              </ProcedureCard>
            ))
          ) : (
            <SyncLoader color={"#f0f0f0"} loading={loading} size={20} />
          )}
        </ProceduresList>
      </ProceduresSection>
    </Container>
  );
};

export default Procedures;
