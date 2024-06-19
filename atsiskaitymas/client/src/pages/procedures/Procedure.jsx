import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api"; // Assuming you have BASE_URL defined in your API utils
import { isAdmin } from "../../../../server/middleware/roleCheck.mjs";

const Container = styled.div`
  text-align: center;
  padding: 48px 16px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const ProcedureSection = styled.section`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #7ab8bf; /* Light blue color */
`;

const ProcedureList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProcedureCard = styled.div`
  background: #ffffff; /* White background */
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  color: #3e848c; /* Dark teal color */
`;

const ProcedureDescription = styled.p`
  font-size: 1rem;
  color: #666666; /* Light gray color */
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  background-color: #7ab8bf; /* Light teal background */
  color: #ffffff; /* White text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-width: 400px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  &:hover {
    background-color: #3e848c; /* Darker teal on hover */
  }
`;

const Procedure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [procedure, setProcedure] = useState(null);

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/procedures/${id}`);
        setProcedure(response.data);
      } catch (error) {
        console.error("Error fetching procedure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedure();
  }, [id]);
  const handleDelete = () => {
    axios.delete(`${BASE_URL}/procedures/${id}`);
    navigate("/procedures");
  };
  return (
    <Container>
      <ProcedureSection>
        <ProcedureList>
          {loading ? (
            <SyncLoader color={"#f0f0f0"} loading={true} size={20} />
          ) : (
            procedure && (
              <>
                <SectionTitle> {procedure[0].title}</SectionTitle>
                <ProcedureCard key={id}>
                  <ProcedureImage src={procedure[0].image} alt={procedure[0].title} />
                  <ProcedureInfo>
                    <ProcedureTitle>{procedure[0].price} €</ProcedureTitle>
                    <ProcedureDescription>{procedure[0].duration}</ProcedureDescription>
                  </ProcedureInfo>
                  {isAdmin && (<Button onClick={handleDelete}>Delete</Button>)}
                  {isAdmin && (<Button onClick={() => navigate(`/edit-procedure/${id}`)}>
                    Edit
                  </Button>)}
                </ProcedureCard>
              </>
            )
          )}
        </ProcedureList>
      </ProcedureSection>
    </Container>
  );
};

export default Procedure;
