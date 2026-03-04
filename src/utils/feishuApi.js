/**
 * 飞书 API 工具函数
 * 处理与飞书多维表格的交互
 * 
 * 注意：当前实现为前端直接调用，会暴露 App Secret。
 * 生产环境应使用后端代理（Cloudflare Worker / Vercel Function）
 */

// 飞书 API 配置
// ⚠️ 生产环境应在 Cloudflare Pages 环境变量中配置
const FEISHU_CONFIG = {
  appId: import.meta.env.VITE_FEISHU_APP_ID || '',
  appSecret: import.meta.env.VITE_FEISHU_APP_SECRET || '',
  appToken: import.meta.env.VITE_FEISHU_APP_TOKEN || '',
  tableId: import.meta.env.VITE_FEISHU_TABLE_ID || ''
}

// API 端点
const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis'

/**
 * 获取飞书 tenant_access_token
 * @returns {Promise<string>} access token
 */
async function getTenantAccessToken() {
  try {
    const response = await fetch(`${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_id: FEISHU_CONFIG.appId,
        app_secret: FEISHU_CONFIG.appSecret
      })
    })

    const data = await response.json()

    if (data.code !== 0) {
      throw new Error(`获取 token 失败: ${data.msg}`)
    }

    return data.tenant_access_token
  } catch (error) {
    console.error('获取飞书 token 失败:', error)
    throw error
  }
}

/**
 * 提交回执数据到飞书多维表格
 * @param {Object} formData - 表单数据
 * @param {string} formData.name - 称呼
 * @param {number} formData.count - 人数
 * @returns {Promise<Object>} 提交结果
 */
export async function submitRSVP(formData) {
  try {
    // 检查环境变量是否配置
    if (!FEISHU_CONFIG.appId || !FEISHU_CONFIG.appSecret) {
      console.warn('飞书 API 未配置，使用模拟提交')
      // 模拟成功响应（演示模式）
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        success: true,
        data: {
          record_id: 'mock-' + Date.now(),
          message: '演示模式：表单提交成功（实际数据未保存到飞书）'
        }
      }
    }

    // 获取 access token
    const token = await getTenantAccessToken()

    // 准备提交的数据
    const submitData = {
      fields: {
        '称呼': formData.name,
        '人数': formData.count,
        '提交时间': new Date().toISOString(),
        '设备信息': navigator.userAgent
      }
    }

    // 提交数据到飞书多维表格
    const response = await fetch(
      `${FEISHU_API_BASE}/bitable/v1/apps/${FEISHU_CONFIG.appToken}/tables/${FEISHU_CONFIG.tableId}/records`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      }
    )

    const result = await response.json()

    if (result.code !== 0) {
      throw new Error(`提交失败: ${result.msg}`)
    }

    console.log('回执提交成功:', result)
    return {
      success: true,
      data: result.data
    }

  } catch (error) {
    console.error('提交回执失败:', error)
    return {
      success: false,
      error: error.message || '提交失败，请稍后重试'
    }
  }
}

/**
 * 获取所有回执记录（用于调试）
 * @returns {Promise<Array>} 回执记录列表
 */
export async function getRSVPRecords() {
  try {
    const token = await getTenantAccessToken()

    const response = await fetch(
      `${FEISHU_API_BASE}/bitable/v1/apps/${FEISHU_CONFIG.appToken}/tables/${FEISHU_CONFIG.tableId}/records`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const result = await response.json()

    if (result.code !== 0) {
      throw new Error(`获取记录失败: ${result.msg}`)
    }

    return result.data.items || []

  } catch (error) {
    console.error('获取回执记录失败:', error)
    throw error
  }
}
