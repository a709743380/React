import { Container, Grid } from "semantic-ui-react";
import MyMenu from './Pages/MyMenu';



function MemberLayout(props) {
 console.log(props)
  return  (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width="3">
          <MyMenu />
          </Grid.Column>
          <Grid.Column width="10">
          {props?.element}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default MemberLayout;
