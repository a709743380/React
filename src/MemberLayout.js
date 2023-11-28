import { Container, Grid } from "semantic-ui-react";
import MyMenu from './Pages/MyMenu';

function MemberLayout(props) {
  return  (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width="3">
          <MyMenu  isGoogleUser={props.isGoogleUser}/>
          </Grid.Column>
          <Grid.Column width="10">
          {props.element}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default MemberLayout;
