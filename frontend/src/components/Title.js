import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Title(props) {
  const { title, description } = props;
  return (
    <Container
      disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 9, pb: 7 }}
    >
      <Typography
        component="h2"
        variant="h3"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        {description}
      </Typography>
    </Container>
  );
}
