import { Container, Grid } from "semantic-ui-react";
import Topics from "./Topics";

function PostLayout(props) {
  console.log(props)
  return  (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width="3">
          <Topics />
          </Grid.Column>
          {props.element}
          <Grid.Column width="10"></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
export default PostLayout;
