import React from 'react'
import styled from '@emotion/styled'

export function TypographyBlock() {
  return (
    <Wrapper>
      <Title as="h1" />
      <Title as="h2" />
      <Title as="h3" />
      <Title as="h4" />
      <Title as="h5" />
      <Title as="h6" />
      <Body />
    </Wrapper>
  )
}

const Title = ({ as = 'h1' }) => {
  return (
    <TitleWrapper>
      <TitleLabel>{as}</TitleLabel>
      <Text as={as} style={{ fontSize: `var(--wp-gs-fontSizes-${as})` }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Text>
    </TitleWrapper>
  )
}

const Body = () => {
  return (
    <TitleWrapper>
      <TitleLabel>body</TitleLabel>
      <Text style={{ fontSize: `var(--wp-gs-fontSizes-body)` }} as="p">
        In a tincidunt sapien. Cras quis libero pellentesque, faucibus sapien
        sit amet, feugiat risus. Nunc id nulla ipsum. Praesent et dolor eu ex
        rhoncus porta ac id sapien. Proin rhoncus dignissim pellentesque. Etiam
        consectetur neque vel tellus ornare, non cursus lectus viverra. Nunc a
        rutrum nulla, ut dapibus elit. Mauris mauris elit, auctor at nisi
        feugiat, consectetur bibendum nisi.
      </Text>
    </TitleWrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 12px;
`

const TitleWrapper = styled.div`
  margin-bottom: 12px;
`

const TitleLabel = styled.div`
  font-size: 11px;
  opacity: 0.5;
`

const Text = styled.div`
  margin: 0;
`
