import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Card from "@mui/material/Card"
import { CardActionArea } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia"
import CardsIcon from "@mui/icons-material/Style"
import OwnerShipLabel from "../OwnerShipLabel"
import "./CollectionItem.scss"
import CardsServices from "../../services/cardsServices"
import { IResponseCard, IResponseCollection } from "@internal/shared"

interface Props {
  collection: IResponseCollection
  index: number
}

const CollectionItem: React.FC<Props> = ({ collection }) => {
  const navigator = useNavigate()
  const { name, _id, createdBy } = collection
  const [cardsInCollection, setCardsInCollection] = useState<IResponseCard[]>(
    []
  )

  useEffect(() => {
    ;(async () => {
      const { data } = await CardsServices.getCardsInCollection(collection._id)
      if (!data) return
      setCardsInCollection(data)
    })()
  }, [collection])

  const handleOpenSidebar = () => navigator(`/collections/${_id}`)

  return (
    <Card
      elevation={6}
      sx={{
        width: 300,
        height: 300,
        background: `linear-gradient(135deg, ${cardsInCollection[0]?.colors[0]} 0%, ${cardsInCollection[0]?.colors[1]} 100%)`
      }}
      className="CollectionItem"
    >
      <CardActionArea
        className="CollectionItem__inner"
        onClick={handleOpenSidebar}
      >
        <CardMedia
          component="div"
          className="CollectionItem__inner__boxAnimate"
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardMedia>
        <CardContent className="CollectionItem__inner__content">
          <Typography gutterBottom variant="h5" component="div">
            <CardsIcon />
            {cardsInCollection.length} cards
          </Typography>
        </CardContent>
      </CardActionArea>
      <OwnerShipLabel createdBy={createdBy.toString()} />
    </Card>
  )
}

export default React.memo(CollectionItem)
