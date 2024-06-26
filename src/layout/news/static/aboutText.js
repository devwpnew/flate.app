import { Linking } from "react-native";
import Paragraph from "../../../ui/text/paragraph";
import Title from "../../../ui/heading/title";

export default function AboutText() {
  const text = `FLATE - магический проект, созданный агентами для агентов.

Он наполнен любовью, как бы странно это не звучало. Потому что мы знаем все боли, которые вы испытывали при работе с клиентами и старались вас бережно от них оградить. Мы сами через них прошли.

Многие думают, что жизнь агента проста и весела - созвонился с клиентом → встретил в аэропорту → привез на объект → получил комиссию. И все это за один день.

Мы с вами знаем, что это не так, за поверхностной работой - огромный труд, который не виден. Тысячи часов в год, на рутину и отработку возражений, жесточайшая конкуренция, это все про рынок недвижимости. Рынок, где выживает сильнейший. Огромная текучка не взялась из ниоткуда, это прямой результат неэффективных действий. Действий, тратя время на которые вы отодвигаете себя от результата, хотя на поверхности лежит убеждение, что вы работаете, а значит делаете все правильно. Работа должна быть тяжела, ведь деньги достаются только тем, кто усердно работает. Это не всегда так! Зачем страдать, если можно не страдать? С большой долей вероятности, вы знаете человека, которому достался клиент, комиссия от которого составила несколько миллионов и это было легко и непринужденно, все были счастливы. Я лично, знаю таких ребят и не одного и не двух, их много.

Создавая FLATE, мы хотели, чтобы вы сами ощутили, как оказывается все может быть просто: зашел → увидел → предложил → продал. Но FLATE не сделает продажу за вас, это нужно понимать. Он освободит для вас время - самый ценный ресурс в наше время. Это время вы можете потратить на привлечение новых клиентов, улучшение своих навыков продаж или на себя. Мы создали его для этого и именно так он устроен.

У нас есть план на год вперед, улучшать и дорабатывать проект. То, что есть сейчас - это только 30% от задуманного, со временем, вы сами все увидите. Главное то, что это уже работает и приносит пользу. Нам нужны вы - наши пользователи! Это было сделано для вас!`;

  return (
    <>
      <Title size="sm">О компании</Title>
      {"\n\n"}
      {text}
      <Paragraph size="lg" style={{ fontStyle: "italic" }}>
        Со всем уважением. Олег, один из основателей FLATE.PRO Мы открыты для
        идей и сотрудничества. Вы всегда можете написать нам на почту{" "}
        <Paragraph
          size="lg"
          onPress={() => Linking.openURL(`mailto:help@flate.pro`)}
          color="blue"
        >
          help@flate.pro
        </Paragraph>{" "}
        или в{" "}
        <Paragraph
          size="lg"
          onPress={() => Linking.openURL(`https://wa.me/79899966015`)}
          color="blue"
        >
          WhatsApp.
        </Paragraph>
      </Paragraph>
    </>
  );
}
