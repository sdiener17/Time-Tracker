import React from "react";
import styled from "styled-components";

export default function HomePage(){
    return(
        <PageWrapper>
            <div>
                Hello from homepage!
            </div>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display:flex;
    flex-direction:column;
`;