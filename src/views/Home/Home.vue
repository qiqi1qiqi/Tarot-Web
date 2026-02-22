<template>
  <section class="Home">
    <div class="text">
      <h3>深呼吸，屏除雜念，開始你的塔羅占卜之旅</h3>
      <Textarea v-model.trim="textValue" placeholder="请输入你要占卜的具体问题（例如：我近期的事业运势如何？）" :disabled="loadingStatus" />
    </div>
    <template v-if="!loadingStatus">
      <h3 class="text nb">选3张卡牌（必须）</h3>
      <div class="card-list" :class="{ active: selectCardArr.length }">
        <div class="card" :class="{ active: selectCardArr.includes(i) }" v-for="i in randomCard" :key="i" @click="selectCard(i)"></div>
      </div>
      <div class="btn">
        <Button class="mt-4 w-full" :disabled="selectCardArr.length < 3 || !textValue" @click="getRes">开始占卜</Button>
      </div>
    </template>
    <div class="card-jx" v-else>
      <div class="show-card">
        <img :class="{ rever: i.isReversed }" :src="renderIMG(`${i.no}.jpg`)" v-for="i in selectCardArr" :key="i" />
      </div>
      <Alert class="mt-4" v-if="resStatus">
        <AlertTitle>🔮 塔罗牌 AI 解析：</AlertTitle>
        <AlertDescription><p class="[&>p]:indent-8 [&>p]:pt-2" ref="typedText"></p></AlertDescription>
      </Alert>
      <Button class="mt-4 ml-auto block w-max" @click="resetFn">重新开始</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import vh from 'vh-plugin'
import { marked } from 'marked'
import Typed from 'typed.js'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const randomCard = ref<number[]>(Array.from({ length: 22 }, (_, i) => i))
const shuffle = () => {
  for (let i = randomCard.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[randomCard.value[i], randomCard.value[j]] = [randomCard.value[j], randomCard.value[i]]
  }
}
shuffle()

const selectCardArr = ref<Array<any>>([])
const selectCard = (id: number) => {
  if (selectCardArr.value.includes(id)) {
    selectCardArr.value = selectCardArr.value.filter((i) => i !== id)
    return
  }
  if (selectCardArr.value.length > 2) return
  selectCardArr.value.push(id)
}

const textValue = ref<string>('')
const loadingStatus = ref<boolean>(false)
const resStatus = ref<boolean>(false)
const typedText = ref<HTMLParagraphElement>()

// 核心逻辑：获取 AI 解析
const getRes = async () => {
  loadingStatus.value = true
  // 处理卡牌正逆位
  const selectedWithPosition = selectCardArr.value.map((i) => ({ 
    no: i, 
    isReversed: Math.random() > 0.5 
  }))
  selectCardArr.value = selectedWithPosition

  vh.showLoading()
  
  try {
    const res = await fetch('/api', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        question: textValue.value, 
        cards: selectedWithPosition 
      }) 
    })
    
    if (!res.ok) throw new Error('API 请求失败')
    
    const resText = await res.text()
    vh.hideLoading()
    resStatus.value = true
    renderRES(resText)
  } catch (error) {
    vh.hideLoading()
    resStatus.value = true
    renderRES("**(水晶球起雾了，暂时无法看清未来的启示...)** \n\n 请检查你的 API 配置或网络状态。")
    console.error(error)
  }
}

const renderRES = async (md: string) => {
  const renderedMarkdown = await marked.parse(md)
  if (typedText.value) {
    new Typed(typedText.value, { 
      strings: [renderedMarkdown], 
      typeSpeed: 20, 
      showCursor: false,
      contentType: 'html'
    })
  }
}

const resetFn = async () => {
  vh.showLoading()
  await new Promise((resolve) => setTimeout(resolve, 666))
  selectCardArr.value = []
  textValue.value = ''
  resStatus.value = false
  loadingStatus.value = false
  shuffle()
  vh.hideLoading()
}

const renderIMG = (url: string) => new URL(`../../assets/images/card/${url}`, import.meta.url).href
</script>

<style scoped lang="less">
@import 'Home.less';
</style>
