import React, { useEffect } from "react";
import { Accordion, Button, Col, Image, Row, Spinner } from "react-bootstrap";
import {
     FaArrowLeft,
     FaMoneyBill,
     FaTags,
     FaUsers,
     FaVideo,
} from "react-icons/fa";
import ReactPlayer from "react-player";
import { Link, Navigate, useParams } from "react-router-dom";

import InfoLabel from "src/components/InfoLabel";

import NavigationHeader from "src/components/NavigationHeader";

import useCourse from "src/hooks/useCourse";
import usePopup from "src/hooks/usePopup";

const DetailCoursePage = () => {
     const params = useParams();
     const { getCourseById, course, loading, error } = useCourse();
     const [showPopup] = usePopup();

     useEffect(() => {
          (async () => {
               try {
                    await getCourseById(params?.courseId);
               } catch (error) {
                    showPopup({
                         bg: "warning",
                         message: error.message,
                    });
               }
          })();
     }, []);

     if (!params?.courseId) {
          return <Navigate to="/courses" replace />;
     }

     const {
          coursePic,
          courseTitle,
          courseDesc,
          price,
          totalUserJoin,
          tags,
          courseModules,
     } = course;

     if (error) return <h1>Something went wrong:( </h1>;

     return (
          <div className="d-flex flex-column gap-5">
               <NavigationHeader
                    title="Detail Course"
                    customPanelAction={
                         <Button as={Link} to="/courses" variant="outline-dark">
                              <FaArrowLeft /> Kembali
                         </Button>
                    }
               />

               {loading ? (
                    <div className="d-flex flex-row justify-content-center">
                         <Spinner animation="grow" />
                    </div>
               ) : (
                    <>
                         <Row className="justify-content-center gap-3">
                              <Col lg={3}>
                                   <Image
                                        src={coursePic}
                                        className="w-100 h-100"
                                   />
                              </Col>
                              <Col lg={4}>
                                   <h2>{courseTitle}</h2>
                                   <InfoLabel
                                        icon={<FaMoneyBill />}
                                        text={`Rp. ${price}`}
                                   />
                                   <InfoLabel
                                        icon={<FaUsers />}
                                        text={`${totalUserJoin} members`}
                                   />
                                   <InfoLabel
                                        icon={<FaTags />}
                                        text={
                                             tags?.length > 0
                                                  ? tags?.join(",")
                                                  : "No tags are applied"
                                        }
                                   />
                                   <InfoLabel
                                        icon={<FaVideo />}
                                        text={`${courseModules?.length} modules`}
                                   />
                              </Col>
                         </Row>
                         <Row>
                              <Col lg="auto">
                                   <h4>About this course</h4>
                                   <p>{courseDesc}</p>
                              </Col>
                         </Row>
                         <Row>
                              <Col>
                                   <h4>Module Player</h4>

                                   <Accordion defaultActiveKey="0" flush>
                                        {courseModules?.length > 0 &&
                                             courseModules.map(
                                                  (module, index) => (
                                                       <Accordion.Item
                                                            eventKey={index.toString()}
                                                       >
                                                            <Accordion.Header>
                                                                 {
                                                                      module.moduleName
                                                                 }
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                 <ReactPlayer
                                                                      width="200"
                                                                      height="100"
                                                                      url={
                                                                           module.fileUrl
                                                                      }
                                                                      controls
                                                                 />
                                                            </Accordion.Body>
                                                       </Accordion.Item>
                                                  )
                                             )}
                                   </Accordion>
                              </Col>
                         </Row>
                    </>
               )}
          </div>
     );
};

export default DetailCoursePage;
