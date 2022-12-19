import React from "react"
import classnames from "classnames"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import { CardActionArea, Divider } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import { useNavigate, useParams } from "react-router-dom"
import "./CardItem.scss"
import OwnerShipLabel from "../OwnerShipLabel"
import { IResponseCard } from "@internal/shared"
interface Props {
  card: IResponseCard
}

const CardItem: React.FC<Props> = ({ card }) => {
  const navigator = useNavigate()
  const params = useParams()
  const { _id, name, value, description, colors, createdBy } = card

  const handleOpenSidebar = () => navigator(`/cards/${_id}`)

  return (
    <Card
      elevation={6}
      className={classnames("CardItem", {
        openOnSidebar: params.id === _id
      })}
      sx={{
        width: 240,
        height: 280,
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`
      }}
    >
      <CardActionArea onClick={handleOpenSidebar} sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: 200,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="CardItem__title"
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="CardItem__value"
          >
            ⚡{value}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            className="CardItem__desc"
          >
            {description}
          </Typography>
        </CardContent>
        <OwnerShipLabel createdBy={createdBy.toString()} />
      </CardActionArea>
    </Card>
  )
}

export default React.memo(CardItem)
