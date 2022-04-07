import React from "react";
import styled from "styled-components";

export default function SemesterPage(){
    return(
        <PageWrapper>
            <div>
                Hello from semester data page!
            </div>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display:flex;
    flex-direction:column;
`;